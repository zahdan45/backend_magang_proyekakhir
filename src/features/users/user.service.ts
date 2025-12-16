import { supabaseAdmin } from '../../core/supabase.js';
import type { User } from '@supabase/supabase-js';

// Tipe untuk data saat membuat pengguna baru
export type UserCreationData = {
  email: string;
  password?: string;
  app_metadata?: {
    roles: string[];
    status: string[];
  };
};

// Tipe untuk data update pengguna
export type UserUpdateData = {
  email?: string;
  password?: string;
  app_metadata?: {
    roles: string[];
    status: string[];
  };
};

// Interface untuk user dengan raw_app_meta_data
interface UserWithRawMetadata extends User {
  raw_app_meta_data?: {
    roles?: string[];
    [key: string]: unknown;
  };
}

/**
 * Fungsi helper untuk mendapatkan peran dari objek pengguna Supabase secara aman.
 * @param user Objek pengguna Supabase
 * @returns Array of strings berisi peran pengguna, atau array kosong jika tidak ada.
 */
const getUserRoles = (user: User): string[] => {
  // Di lingkungan server, metadata kustom sering berada di 'raw_app_meta_data'.
  // 'app_metadata' adalah fallback jika diakses dari konteks lain.
  const userWithRawMetadata = user as UserWithRawMetadata;
  const metadata = userWithRawMetadata.raw_app_meta_data || user.app_metadata;
  return metadata?.roles || [];
};

/**
 * Mengambil daftar pengguna dengan menerapkan Aturan Visibilitas.
 * - Admin reguler tidak dapat melihat pengguna dengan peran 'super_admin'.
 * - Super admin dapat melihat semua pengguna.
 * @param currentUser Objek pengguna yang sedang login (dari middleware 'protect').
 */
export const getAllUsers = async (currentUser: User) => {
  const currentUserRoles = getUserRoles(currentUser);
  const isSuperAdmin = currentUserRoles.includes('super_admin');

  // Ambil semua pengguna dari Supabase Auth
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    // Opsi untuk pagination dapat diaktifkan di sini nanti
    // page: parseInt(options.page as string) || 1,
    // perPage: parseInt(options.limit as string) || 10,
  });

  if (error) {
    throw new Error(error.message);
  }

  let users = data.users;

  // --- ATURAN VISIBILITAS DITERAPKAN DI SINI ---
  // Jika pengguna yang membuat permintaan BUKAN seorang super_admin,
  // saring daftar pengguna untuk menyembunyikan semua pengguna yang memiliki peran 'super_admin'.
  if (!isSuperAdmin) {
    users = users.filter((user) => !getUserRoles(user).includes('super_admin'));
  }
  // ---------------------------------------------

  // Format ulang data untuk dikirim ke frontend, termasuk peran (roles)
  return users.map((user) => ({
    id: user.id,
    email: user.email,
    created_at: user.created_at,
    last_sign_in_at: user.last_sign_in_at,
    roles: getUserRoles(user), // Sertakan peran dalam respons
  }));
};

/**
 * Membuat pengguna baru dengan validasi peran.
 * @param currentUser Pengguna yang melakukan aksi.
 * @param newUserdata Data untuk pengguna baru.
 */
// export const createUser = async (
//   currentUser: User,
//   newUserdata: UserCreationData
// ) => {
//   const currentUserRoles = getUserRoles(currentUser);
//   const isSuperAdmin = currentUserRoles.includes('super_admin');

//   const requestedRoles = newUserdata.app_metadata?.roles || [];

//   // ATURAN KEAMANAN: Hanya super_admin yang boleh membuat super_admin
//   if (requestedRoles.includes('super_admin') && !isSuperAdmin) {
//     throw new Error(
//       'Forbidden: Only super admins can create other super admins.'
//     );
//   }

//   // Atur peran default jika tidak diberikan
//   if (requestedRoles.length === 0) {
//     newUserdata.app_metadata = { roles: ['user'], status: ['active'] };
//   }

//   const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
//     email: newUserdata.email,
//     password: newUserdata.password,
//     app_metadata: newUserdata.app_metadata,
//     email_confirm: true, // Wajibkan konfirmasi email
//   });

//   if (error) {
//     throw new Error(error.message);
//   }

//   // Return user data (password is not included in User type)
//   return newUser.user;
// };

export const createUser = async (
  currentUser: User,
  newUserdata: {
    email: string;
    app_metadata?: { roles?: string[]; status?: string[] };
  }
) => {
  const currentUserRoles = getUserRoles(currentUser);
  const isSuperAdmin = currentUserRoles.includes('super_admin');

  const requestedRoles = newUserdata.app_metadata?.roles || [];

  if (requestedRoles.includes('super_admin') && !isSuperAdmin) {
    throw new Error(
      'Forbidden: Only super admins can invite other super admins.'
    );
  }

  // Kita tidak lagi mengatur status 'pending' di sini, karena Auth Hook akan menanganinya.
  const finalRoles = requestedRoles.length > 0 ? requestedRoles : ['user'];
  const finalAppMetadata = {
    ...newUserdata.app_metadata,
    roles: finalRoles,
  };

  // Gunakan fungsi inviteUserByEmail
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
    newUserdata.email,
    { data: finalAppMetadata } // Kirim metadata peran bersama undangan
  );

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};
/**
 * Memperbarui data pengguna dengan validasi peran.
 * @param targetUserId ID pengguna yang akan diubah.
 * @param currentUser Pengguna yang melakukan aksi.
 * @param updateData Data yang akan diubah.
 */
export const updateUser = async (
  targetUserId: string,
  currentUser: User,
  updateData: UserUpdateData
) => {
  const currentUserRoles = getUserRoles(currentUser);
  const isSuperAdmin = currentUserRoles.includes('super_admin');

  // Ambil data pengguna target untuk memeriksa perannya saat ini
  const {
    data: { user: targetUser },
    error: findError,
  } = await supabaseAdmin.auth.admin.getUserById(targetUserId);

  if (findError) {
    throw new Error('Target user not found.');
  }

  if (!targetUser) {
    throw new Error('Target user not found.');
  }

  const targetUserRoles = getUserRoles(targetUser);
  const targetIsSuperAdmin = targetUserRoles.includes('super_admin');

  // --- ATURAN KEAMANAN ---
  // 1. Admin biasa tidak bisa mengedit super_admin
  if (targetIsSuperAdmin && !isSuperAdmin) {
    throw new Error('Forbidden: Admins cannot edit super admins.');
  }

  // 2. Hanya super_admin yang boleh memberikan atau mencabut peran super_admin
  const requestedRoles = updateData.app_metadata?.roles;
  if (
    requestedRoles &&
    requestedRoles.includes('super_admin') &&
    !isSuperAdmin
  ) {
    throw new Error(
      'Forbidden: Only super admins can assign the super_admin role.'
    );
  }

  // Lanjutkan dengan update
  const { data: updatedUser, error: updateError } =
    await supabaseAdmin.auth.admin.updateUserById(targetUserId, updateData);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedUser.user;
};

/**
 * Menghapus pengguna berdasarkan ID.
 * @param id UUID pengguna yang akan dihapus.
 * @returns Objek pesan konfirmasi.
 */
export const deleteUserById = async (id: string) => {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

  if (error) {
    // Jika pengguna tidak ditemukan atau ada masalah lain
    throw new Error(error.message);
  }

  return { message: `User with id ${id} successfully deleted.` };
};
