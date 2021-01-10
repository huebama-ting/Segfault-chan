'use strict';

function handleResponse(response) {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
};

function logError(error) {
    console.log(error);
};

function sendReply(msg, embed) {
    try {
        msg.channel.send(embed);
    } catch (err) {
        msg.client.extLog.error(chalk.red(err));
    }
};

function formatInfo(str) {
    if (str === null) {
        return 'N/A';
    }

    return str;
}

function formatDescription(description) {
    if (description === null) {
        return 'N/A';
    }

    return description.replace(/(<br>)+/g, '\u000a').trim();
};

function formatGenres(array) {
    let formattedString = '';

    for (const str of array) {
        formattedString += str + ', ';    
    }

    formattedString = formattedString.slice(0, formattedString.length - 2);

    if (formattedString.length === 0 || formattedString === ' ') {
        formattedString = 'N/A';
    }

    return formattedString;
};

module.exports = {
    handleResponse,
    logError,
    sendReply,
    formatInfo,
    formatDescription,
    formatGenres
}
