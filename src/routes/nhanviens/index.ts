import { Elysia } from 'elysia';
import { getNhanViens, getNhanVienById, createNhanVien, deleteNhanVien, updateNhanVien } from '../nhanviens/handlers';

const nhanVienRoutes = new Elysia({prefix: '/nhanvien'})
    .get('/getall', () => getNhanViens())
    .get('/:id/getbyid', ({params: { id }}) => getNhanVienById(id))
    .post('/create', ({ body }) => createNhanVien(body))
    .put('/:id/update', ({params: {id}, body }) => updateNhanVien(id, body))
    .delete('/:id/delete', ({params: { id }}) => deleteNhanVien(id))

    export default nhanVienRoutes