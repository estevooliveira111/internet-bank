import Account from '@/services/Account';
import router from '@/router'

function Auth(to, from, next) {
    var isAuthenticated = false;
    const token = localStorage.getItem('token');

    if (token)
        isAuthenticated = true;
    else
        isAuthenticated = false;
    if (isAuthenticated) {
        const account = new Account()

        account.me().catch((error) => {
            console.log(error);
            router.push({ name: 'login' })
        })

        next();
    }
    else {
        router.push({ name: 'login' })
    }
}

export default Auth