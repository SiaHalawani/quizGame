const getPlayerById = async (playerID) => {
    try {
        //Fetches player details from the database based on the provided player ID
        const sql = 'SELECT * FROM players WHERE playerID = ?';
        const result = await query(sql, [playerID]);
        return result; // Returns the player details
    } catch (error) {
        throw new Error(error);
    }
};
