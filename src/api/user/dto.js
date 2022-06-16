class UserDto {
    id;
    email;
    firstName;
    lastName;
    gender;
    createdAt;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.gender = model.gender;
        this.createdAt = model.createdAt;
    }
}

module.exports = UserDto;
