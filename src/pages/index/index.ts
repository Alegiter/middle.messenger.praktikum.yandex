import { Router } from '../../core/utils/routing/router';
import { Login } from '../login/login';
import { Registration } from '../registration/registration';
import { Profile } from '../profile/profile';
import { Routes } from '../../core/utils/routing/routes';

Router.withRoute(Routes.LOGIN, Login)
    .withRoute(Routes.SIGNUP, Registration)
    .withRoute(Routes.SETTINGS, Profile)
    // .withRoute(Routes.MESSENGER, Profile)
    .start();
