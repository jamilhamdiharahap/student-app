import instance from "../plugins/axios";

export async function getStudent({ page, name }) {
    try {
        const { data } = await instance.get(`/student?page=${page}&name=${name}`);
        return data;
    } catch (err) {
        return err;
    }
}

export async function getStudentDetail(paramId) {
    try {
        const { data } = await instance.get(`/student/detail?id=${paramId}`);
        return data;
    } catch (err) {
        return err;
    }
}

function getProperFilename(filename) {
    const fileExtension = filename.split('.').pop().toLowerCase();
    const allowedExtensions = {
        png: 'image/png',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
    };

    for (const ext in allowedExtensions) {
        if (allowedExtensions.hasOwnProperty(ext) && allowedExtensions[ext] === response.type) {
            return `${filename}.${ext}`;
        }
    }
    return filename;
}

export async function getDownload(filename) {
    try {
        const response = await instance.get(`/student/download/${filename}`, {
            responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        
        const blobUrl = window.URL.createObjectURL(blob);
        
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = filename; 
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        
        anchor.click();
        
        window.URL.revokeObjectURL(blobUrl);

        return response
    } catch (err) {
        return err;
    }
}

export async function postStudent(payload) {
    try {
        const formData = new FormData();
        formData.append('name', payload.name);
        formData.append('place_date_of_birth', payload.place_date_of_birth);
        formData.append('nik', payload.nik);
        formData.append('status', payload.status);
        formData.append('birth_certificate', payload.birth_certificate);
        formData.append('family_card', payload.family_card);

        const { data } = await instance.post(`/student/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    } catch (err) {
        return err;
    }
}


export async function updateStudent(payload, id) {
    try {
        const formData = new FormData();
        formData.append('name', payload.name);
        formData.append('place_date_of_birth', payload.place_date_of_birth);
        formData.append('nik', payload.nik);
        formData.append('status', payload.status);
        formData.append('birth_certificate', payload.birth_certificate);
        formData.append('family_card', payload.family_card);

        const { data } = await instance.put(`/student?id=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    } catch (err) {
        return err;
    }
}

export async function deleteStudent(paramId) {
    try {
        const { data } = await instance.delete(`/student?id=${paramId}`);
        return data;
    } catch (err) {
        return err;
    }
}