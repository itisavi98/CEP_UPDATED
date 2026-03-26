// frontend/src/services/supabaseAuthService.js
import { supabase } from './supabaseClient';

const supabaseAuthService = {
  login: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!data || !data.user || !data.session) {
      throw new Error('Invalid login response from Supabase.');
    }

    // Check if user is admin (you can add a role check here later)
    // For now, assume logged in user is admin
    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        role: 'admin',
      },
      token: data.session.access_token,
    };
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  signUp: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data;
  },
};

export default supabaseAuthService;
