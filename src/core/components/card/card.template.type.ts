/* eslint-disable @typescript-eslint/no-explicit-any */
import Component from '../component';

export type CardTemplate = {
    header?: Component<any>;
    body?: Component<any>;
    footer?: Component<any>;
};
