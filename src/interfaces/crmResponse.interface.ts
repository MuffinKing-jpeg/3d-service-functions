import {FieldTransformedInterface} from './fieldTransformed.interface';

export interface CrmResponseInterface {
    data: {
        meta?: {
            message: string
        }
        data: Array<any>
    }
    fields: FieldTransformedInterface

}
