import {Router} from 'express';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } from '../controllers/employees.controllers.js';


const router = Router();

router.get('/employees', getEmployees);

router.get('/employees/:id', getEmployee);

router.post('/employees', createEmployee);

router.patch('/employees/:id', updateEmployee); //patch es similar a put pero solo actualiza parcialmente

router.delete('/employees/:id', deleteEmployee);

export default router;

