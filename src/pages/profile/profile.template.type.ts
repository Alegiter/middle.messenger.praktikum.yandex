import Form from '../../core/components/form/form';
import Button from '../../core/components/button/button';
import Header from '../../core/components/header/header';
import EditableAvatar from './components/editable-avatar/editable-avatar';

export type ProfileTemplate = {
    header: Header;
    profileImage: EditableAvatar;
    fullName: string;
    form: Form;
    edit: Button;
    changePassword: Button;
};
