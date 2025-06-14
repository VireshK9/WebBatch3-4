const bcrypt = require('bcryptjs');
async function run(){
    //signup pass
    const password = "admin123";
    const saltRounds = 10;

    // generate a salt - string of random characters
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("Salt:", salt);

    // hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword);

    //login pass
    const loginPassword = "admin1234";

    //compare the login password with the hashed password
    const isMatch = await bcrypt.compare(loginPassword, hashedPassword);
    if (isMatch) {
        console.log("Password match!");
    } else {
        console.log("Password does not match.");
    }
}
run();