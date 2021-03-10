const {characterRepository} = require("../../../infrastracture/repositories/character");
const {characterExceptions} = require("../../../domain/character/exceptions");
const {uploadService} = require("../uploading");
const {appConfig} = require("../../../config");

const findByID = async userID => await characterRepository.findByUserID(userID);

const uploadAvatar = async (data, filename, userID) => {
    const character = await characterRepository.findByUserID(userID);
    const filePath = await uploadService.upload(data, filename);
    const avatarURL = getAvatarURL(filePath);
    await characterRepository.update({avatar: avatarURL}, character.id);
    return avatarURL;
};

const setDescription = async (description, userID) => {
    const character = await characterRepository.findByUserID(userID);
    await characterRepository.update({description: description}, character.id);
    return await characterRepository.findByUserID(character.id);
};

const updateCharacter = async (data, userID) => {
    const character = await characterRepository.findByUserID(userID);
    if (data.strength) {
        character.strength = data.strength;
    }
    if (data.agility) {
        character.agility = data.agility;
    }
    if (data.endurance) {
        character.endurance = data.endurance;
    }
    if (data.intelligence) {
        character.intelligence = data.intelligence;
    }

    character.updateStats();
    await characterRepository.update(character.dataValues, character.id);
    return await characterRepository.findByUserID(userID);
};

const getAvatarURL = filePath => {
    const dirs = filePath.split("/");
    return `http://${appConfig.HOST}:${appConfig.PORT}/media/${dirs[dirs.length-1]}`;
};

module.exports = {
    findByID: findByID,
    uploadAvatar: uploadAvatar,
    setDescription: setDescription,
    updateCharacter: updateCharacter,
};