module.exports = function ( { participants, sports }) {
    function constructFrom(fnConstructor, params) {
        const res = Object.create(fnConstructor.prototype);
        fnConstructor.apply(res, params);
        return res;
    }

    function assignParticipants() {
        const participants = this.participants;
        const sports = this.sports;
        const orderIndexes = [];

        for (let i = sports.length - 1; i >= 0; i--) {
            orderIndexes.push(i);
        }

        return orderIndexes.map((index, i) => [sports[i], participants[index]]);
    }

    function Contest(participants, sports) {
        this.participants = participants;
        this.sports = sports;
    }

    Contest.prototype.assignParticipants = assignParticipants;

    const contest = constructFrom(Contest, [participants, sports]);

    return contest.assignParticipants();
}
