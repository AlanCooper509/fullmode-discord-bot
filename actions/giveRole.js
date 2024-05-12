module.exports = {
    // Gives a selected role to user
    async toUser(member, role) {
        if (!role || !member) return;
        try {
            await member.roles.add(role);
            console.log(`Gave ${role} to ${member}`);
        } catch (error) {
            console.log('Error adding role to user: ', error);
            return;
        }
    }
}