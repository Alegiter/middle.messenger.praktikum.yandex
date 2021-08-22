import { Router } from '../../core/utils/routing/router';
import { Login } from '../login/login';
import { Registration } from '../registration/registration';
import { Profile } from '../profile/profile';
import { Routes } from '../../core/utils/routing/routes';
import { ProfileEdit } from '../profile/edit/edit';
import { ProfilePasswordChange } from '../profile/password/change';
import { AuthApi } from '../../core/api/services/auth.api';

Router.withRoute(Routes.LOGIN, Login)
    .withRoute(Routes.SIGNUP, Registration)
    .withRoute(Routes.SETTINGS, Profile)
    .withRoute(Routes.SETTINGS_EDIT, ProfileEdit)
    .withRoute(Routes.SETTINGS_PASSWORD_CHANGE, ProfilePasswordChange)
    // .withRoute(Routes.MESSENGER, Profile)
    .start();

// Simple check for unauthorized user
const authApi = new AuthApi();
authApi.getUser().catch(() => Router.go(Routes.LOGIN));
