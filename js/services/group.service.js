import ApiService from './api';

class GroupService {

    constructor() {
        this.apiService = new ApiService();
    }

    getGroups() {
        return this.apiService.GET('/group/user/get-groups');
    }
}

export default (GroupService);
