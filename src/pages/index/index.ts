import { Router } from '../../core/utils/routing/router';
import { Login } from '../login/login';
import { Registration } from '../registration/registration';
import { Profile } from '../profile/profile';
import { Routes } from '../../core/utils/routing/routes';
import { ProfileEdit } from '../profile/edit/edit';
import { ProfilePasswordChange } from '../profile/password/change';

Router.withRoute(Routes.LOGIN, Login)
    .withRoute(Routes.SIGNUP, Registration)
    .withRoute(Routes.SETTINGS, Profile)
    .withRoute(Routes.SETTINGS_EDIT, ProfileEdit)
    .withRoute(Routes.SETTINGS_PASSWORD_CHANGE, ProfilePasswordChange)
    // .withRoute(Routes.MESSENGER, Profile)
    .start();
