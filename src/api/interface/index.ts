// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}

// * 用户列表
export namespace UserList {
	export interface ReqUserListQuery {
		keyVal: string;
		pageNum: number;
		pageSize: number;
		phoneNumber: string;
		sortField: string;
		sortOrder: string;
		status: number | null;
		userId: number | null;
		username: string;
		vip: number | null;
	}
	export interface ResUserList {
		records: UsersDataType[];
		current: number;
		pages: number;
		size: number;
		total: number;
	}
	export interface UsersDataType {
		keyVal: string;
		pageNum: number;
		pageSize: number;
		phoneNumber: string;
		sortField: string;
		sortOrder: string;
		status: number;
		userId: number;
		username: string;
		vip: number;
	}
}

export namespace BookList {
	export interface ReqBookListQuery {
		author: string;
		bookId: number | null;
		bookName: string;
		bookStatus: number | null;
		chapterStatus: number | null;
		coverUrl: string;
		fileHash: string;
		fileUrl: string;
		pageNum: number;
		pageSize: number;
		sortField: string;
		sortOrder: string;
		userId: number | null;
		userStatus: number | null;
	}
}

export namespace GenerateBetaKey {
	export interface ReqGenerateBetaKey {
		quota: number;
		secret: string;
		vip: number;
	}
}
