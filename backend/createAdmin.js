const bcrypt = require('bcrypt');
const pool = require('./db')


const createAdmin = async () => {
    const username = 'admin';
    const password = 'Peja2018';
    const role = 'admin';


    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(`INSERT INTO users (username, password, role) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING`,[username, hashedPassword, role]); 

            if (result.rowCount === 0) {
                console.log(`Admin user already existst`);
                
            }else {
                console.log(`Admin user created successfully`);
                
            }
            process.exit(0);
    }catch(err){
        console.log(`Error creating admin user: ${err.message}`);
        process.exit(1);
    }
}

createAdmin();