import {pool} from '../db.js';

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employees');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un Error inesperado',
        });
    }
};

export const getEmployee = async (req, res) => {
    try {
        //throw new Error('DB Error'); //Simulacion de error
        //console.log(req.params.id); Trae todo los parametros de la url
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
        //console.log(rows);

        if(rows.length <= 0) {
            return res.status(404).json({
                message: 'Empleado no encontrado'
            });
        }
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un Error inesperado',
        });
    }
};

export const createEmployee = async (req, res) => {
    try {
        console.log(req.body);
        const {name, salary} = req.body;
        //Aca se pueden realizar todas las verificaciones antes de subir a la base de datos
        const [rows] = await pool.query('INSERT INTO employees (name, salary) VALUES (?, ?)', [name, salary]);
        res.send({
            id: rows.insertId,
            name,
            salary,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un Error inesperado',
        });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, salary} = req.body;
        const [result] = await pool.query('UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', 
        [name, salary, id]);
        if(result.affectedRows <= 0) {
            return res.status(404).json({
               message: 'Empleado no encontrado'
            });
        }
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);

        console.log(result);
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un Error inesperado',
        });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const [deleted] = await pool.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
        console.log(deleted);

        if(deleted.affectedRows <= 0) {
            return res.status(404).json({
               message: 'Empleado no encontrado'
            });
        }
        res.sendStatus(204);//Solo devuelve que funciono
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un Error inesperado',
        });
    }
};

