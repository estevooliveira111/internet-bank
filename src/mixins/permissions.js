export function hasPermission(permissionName) {
    // Obtém as permissões do localStorage
    const permissions = localStorage.getItem('permissions');

    // Verifica se as permissões existem e são válidas JSON
    if (!permissions) {
        return false;
    }

    // Tenta analisar as permissões como JSON
    try {
        const parsedPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
        return parsedPermissions.some(permission => permission.name === permissionName);
    } catch (e) {
        // Se ocorrer um erro ao analisar JSON, retorna false
        console.error('Erro ao analisar permissões:', e);
        return false;
    }
}