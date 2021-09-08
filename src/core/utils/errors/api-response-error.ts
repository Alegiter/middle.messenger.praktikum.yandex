import { BadRequest } from '../../api/types/bad-request';

export class ApiResponseError extends Error implements BadRequest {
    reason: string;
    status: number;
    constructor(xhr: XMLHttpRequest) {
        super();
        this.reason = xhr.response.reason || 'Unknown reason';
        this.status = xhr.status;
    }
}
