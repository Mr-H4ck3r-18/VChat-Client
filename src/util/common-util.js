

export const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const min = new Date(date).getMinutes();

    return `${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}`
}

export const downloadMedia = (e, file) => {
    e.preventDefault();
    try {
        fetch(file)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;

                const filename = file.split('/').pop();

                a.download = "" + filename + '';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }).catch(error => console.log("Error while downloading the media", error.message))
    } catch (error) {
        console.log("Error while downloading the media", error.message)
    }
}