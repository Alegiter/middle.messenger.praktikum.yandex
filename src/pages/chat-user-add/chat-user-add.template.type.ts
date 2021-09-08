import Header from '../../core/components/header/header';
import Form from '../../core/components/form/form';
import Button from '../../core/components/button/button';
import { UserList } from '../../core/components/user-list/user-list';

export type ChatUserAddTemplate = {
    header: Header;
    search: Form;
    userList: UserList;
    submit: Button;
};
