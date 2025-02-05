import { v4 as createUuid } from 'uuid';
import { datasource } from '../config/datasource.js';

class MeditationRepository {
    async createMeditation(meditation) {
        const { started, ended, deviceUuid } = meditation;
        const id = createUuid();
        const result = await datasource`
            INSERT INTO meditations (id, started, ended, device_uuid)
            VALUES (${id}, ${started}, ${ended}, ${deviceUuid})
                RETURNING *;
        `;
        return result[0];
    }

    async getAllMeditations(filter) {
        const {deviceUuid} = filter;
        return datasource`
            SELECT * FROM meditations WHERE device_uuid = ${deviceUuid};
        `;
    }

}

export default MeditationRepository;