import template from './change.template';
import { ProfilePasswordChangeTemplate } from './change.template.type';
import Component, { ComponentProperties } from '../../../core/components/component';
import Form from '../../../core/components/form/form';
import FormItem from '../../../core/components/form/item/form-item';
import RequireValidator from '../../../core/utils/validators/required-validator';
import Input from '../../../core/components/input/input';
import Button from '../../../core/components/button/button';
import { Handlebars } from '../../../core/utils/handlebars';
import Header from '../../../core/components/header/header';
import { AppRouter } from '../../../core/utils/routing/router';
import { Routes } from '../../../core/utils/routing/routes';
import { QuerySelectAppender } from '../../../core/utils/query-select-appender';
import {
    ProfilePasswordChangeController,
    UserUpdatePasswordData
} from './change.controller';
import { ValidationError } from '../../../core/utils/errors/validation-error';

type ProfilePasswordChangeProperties = ComponentProperties &
    ProfilePasswordChangeTemplate;

export class ProfilePasswordChange extends Component<ProfilePasswordChangeProperties> {
    private readonly controller = new ProfilePasswordChangeController();

    constructor() {
        super('div', {
            header: new Header({
                stick: {
                    top: true
                },
                title: {
                    centered: true,
                    value: 'Смена пароля'
                },
                back: {
                    click: () => {
                        AppRouter.go(Routes.SETTINGS);
                    }
                }
            }),
            form: new Form({
                events: {
                    submit: (event) => {
                        event.preventDefault();
                        this.save();
                    }
                },
                items: [
                    {
                        title: 'Старый пароль',
                        name: 'oldPassword'
                    },
                    {
                        title: 'Новый пароль',
                        name: 'newPassword'
                    },
                    {
                        title: 'Новый пароль (ещё раз)',
                        name: 'newPasswordAgain'
                    }
                ].map(
                    (item) =>
                        new FormItem({
                            title: item.title,
                            validation: {
                                validateOn: 'blur',
                                validators: [new RequireValidator()]
                            },
                            input: new Input({
                                html: {
                                    maxLength: 50,
                                    required: true,
                                    type: 'password',
                                    name: item.name
                                }
                            })
                        })
                ),
                submit: new Button({
                    text: 'Сменить пароль'
                })
            })
        });
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        const { header, form } = this.properties;
        new QuerySelectAppender(this.element)
            .queryAndAppend('.card__header', header.element)
            .queryAndAppend('.card__body', form.element);
    }

    private save() {
        if (this.properties.form.valid) {
            this.controller
                .changePassword(this.properties.form.value as UserUpdatePasswordData)
                .then(() => {
                    // todo [sitnik] success notify
                    AppRouter.go(Routes.SETTINGS);
                })
                .catch((err) => {
                    if (err instanceof ValidationError) {
                        this.properties.form
                            .getItemByName(err.targetName)
                            ?.setError(err.message);
                    } else {
                        // todo [sitnik] error notify
                    }
                });
        }
    }
}
