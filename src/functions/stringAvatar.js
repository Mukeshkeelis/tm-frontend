
const stringToColor = (string) => {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
}

//stringAvatar javascript  function
const stringAvatar = (name) => {
    //console.log("stringAvatar: ", name)
    if (name) {
        name = name.toUpperCase()
        //if name starts with Dr. then remove it
        if (name.startsWith('Dr. ')) {
            name = name.substring(4);
        }

        if (name.startsWith('WWW.')) {
            name = name.substring(4);
        }
        //if name has multiple parts
        let hasMultipleParts = name.indexOf(" ") > -1;
        if (hasMultipleParts) {
            // console.log("stringAvatar: ", 'multiple parts')
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
        else {
            // console.log("stringAvatar: ", 'No multiple parts')
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: `${name[0]}`,
            };
        }
    }
    else {
        return {
            sx: {
                bgcolor: stringToColor(""),
            },
            children: ``,
        };
    }
}
//export stringAvatar
export default stringAvatar 
