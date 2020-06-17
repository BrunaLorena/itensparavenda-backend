const Pool = require ('pg').Pool;

const pool = new Pool ({
    user: 'wvjkwamlczxeok',
    password: 'db6339c15ce314bbc67305d8099a9707c64416eaa0ec3a386ce573937ce59082',
    host: 'ec2-3-91-139-25.compute-1.amazonaws.com',
    database: 'd80eef59i8naku',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const sqlCreate = `
   CREATE TABLE IF NOT EXISTS itensparavenda 
   (
      ID serial primary key,
      item varchar(50) not null,
      valor decimal not null,
      tamanho varchar (50) 
   )
`;

pool.query(sqlCreate, function(error, result) {
    if(error)
     throw error
    console.log('Tabela criada com sucesso!');
});

module.exports = {
async create(item, valor, tamanho) {
    const sql = 'INSERT INTO itensparavenda (item, valor, tamanho) VALUES ($1, $2, $3)';
    const result = await pool.query(sql, [item, valor, tamanho]);
    return result.rowCount;
},

async read() {
    const sql = `SELECT * FROM itensparavenda`;
    const result = await pool.query(sql);
    return result.rows;
},
async update(id, item, valor, tamanho) {
    const sql = `UPDATE itensparavenda
    SET item = $1, valor= $2 , tamanho= $3
    WHERE  id = $4`
    const result = await pool.query(sql,[item, valor, tamanho, id]);
    return result.rowCount;
},
async delete(id){
    const sql = `DELETE FROM itensparavenda WHERE id= $1`; 
    const result = await pool.query(sql, [id]);
    return result.rowCount;
},   
    async () {  
    console.log(itensparavenda)
    const result = await pool.query(sql, [item, valor, tamanho]);
    return result.rowCount;
    }
    
 }
