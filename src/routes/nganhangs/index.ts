import { Elysia } from 'elysia';
import { getNganHangs, getNganHangById, createNganHang, deleteNganHang, updateNganHang } from './handlers';

const nganHangRoutes = new Elysia({prefix: '/nganhang'})
    .get('/getall', () => getNganHangs())
    .get('/:id/getbyid', ({params: { id }}) => getNganHangById(id))
    .post('/create', ({ body }) => createNganHang(body))
    .put('/:id/update', ({params: {id}, body }) => updateNganHang(id, body))
    .delete('/:id/delete', ({params: { id }}) => deleteNganHang(id))

    export default nganHangRoutes