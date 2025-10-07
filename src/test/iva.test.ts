import {iva} from '../helpers/utils';

describe ('utils/iva', () => {
    test ('Calcular el IVA', () => {
        expect (iva(100000)). toBe(119000)
    })
}); 