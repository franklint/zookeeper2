
class Employee {
    constructor(name, id, email, phone){
        this.name = name; 
        this.id = id; 
        this.email = email; 
        this.phone = phone; 
     
    }

    getName() {
        return this.name; 
    } 

    getId(){
        return this.id; 
    }

    getEmail(){
        return this.email; 
    }

    getPhone(){
        return this.phone; 
    }

    getRole(){
        return 'Employee'; 
    }

}

module.exports = Employee; 