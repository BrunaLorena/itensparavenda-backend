const Pool = require ('pg').Pool;

const pool = new Pool ({
    user: 'dgssmetrmftwbj',
    password: '6c3251f95e2bc9fb7886f23192087ca0ea8355c7879eb142b8174619a598fa2b',
    host: 'ec2-34-193-117-204.compute-1.amazonaws.com',
    database: 'drnekggaqpfeo',
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

async insert(item, valor, tamanho) {
    const sql = 'INSERT INTO itensparavenda (item, valor, tamanho) VALUES ($1, $2, $3)';

    const result = await pool.query(sql, [item, valor, tamanho]);
    return result.rowCount;
},

async select() {
    const sql = 'SELECT * FROM itensparavenda'
    const result = await pool.query(sql);
    return result.rows;
},
 async  delete(item){

        const sql = `DELETE FROM itensparavenda WHERE item = $1`; 
        const result = await pool.query(sql, [item]);
        return result.rowCount;
},

async  update(item, valor, tamanho) {

        const sql = `UPDATE itensparavenda
        SET valor = $2, tamanho= $3
        WHERE  item = $1`;
        
        console.log(item)
     const result = await pool.query(sql, [item, valor, tamanho]);
        return result.rowCount;
 },


}
