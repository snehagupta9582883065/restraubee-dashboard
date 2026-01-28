export const getUserRole = (): 'admin' | 'user' | 'super-admin' => {
    if (typeof window !== 'undefined') {
        const role = localStorage.getItem('userRole');
        if (role === 'admin' || role === 'user' || role === 'super-admin') return role as any;
    }
    return 'admin';
};