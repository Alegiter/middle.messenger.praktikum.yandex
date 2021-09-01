import { BadRequest } from '../../api/types/bad-request';

export class ApiResponseError extends Error implements BadRequest {
    reason: string;
    constructor(response: any) {
        super();
        this.reason = response.reason || 'Unknown reason';
    }
}
