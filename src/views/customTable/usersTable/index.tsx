import React, { useEffect, useState } from "react";
import { Table, TableColumnsType, Form, Divider, Space, message } from "antd";
import "./index.less";
// @ts-ignore
import { changeUserStatusApi, getUsersListApi } from "@/api/modules/user-admin-controller";
import { UserList } from "@/api/interface";
import { AdvancedSearchForm } from "@/views/customTable/usersTable/component/filterForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const defaultUserListQuery: UserList.ReqUserListQuery = {
	keyVal: "",
	pageNum: 0,
	pageSize: 0,
	phoneNumber: "",
	sortField: "",
	sortOrder: "",
	status: null,
	userId: null,
	username: "",
	vip: null
};

const UsersTable = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const queryClient = useQueryClient();
	const [userListQuery, setUserListQuery] = useState<UserList.ReqUserListQuery>({
		keyVal: "",
		pageNum: 0,
		pageSize: 0,
		phoneNumber: "",
		sortField: "",
		sortOrder: "",
		status: null,
		userId: null,
		username: "",
		vip: null
	});
	// const [setDataSource] = useState<UserList.UsersDataType[]>();
	// const [setLoading] = useState(false);

	const columns: TableColumnsType<UserList.UsersDataType> = [
		{
			title: "用户名",
			dataIndex: "username",
			key: "username",
			align: "center",
			ellipsis: true,
			fixed: "left"
		},
		{
			title: "userId",
			dataIndex: "userId",
			key: "userId",
			align: "center",
			ellipsis: true
		},
		{
			title: "内测 key",
			dataIndex: "keyVal",
			key: "keyVal",
			align: "center",
			ellipsis: true
		},
		{
			title: "手机号",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
			align: "center",
			ellipsis: true
		},
		{
			title: "用户类型",
			dataIndex: "vip",
			key: "vip",
			align: "center",
			ellipsis: true
		},
		{
			title: "原始额度",
			dataIndex: "originalQuota",
			key: "originalQuota",
			align: "center",
			ellipsis: true
		},
		{
			title: "当前额度",
			dataIndex: "currentQuota",
			key: "currentQuota",
			align: "center",
			ellipsis: true
		},
		{
			title: "书本数量",
			dataIndex: "bookNum",
			key: "bookNum",
			align: "center",
			ellipsis: true
		},
		{
			title: "用户状态",
			dataIndex: "status",
			key: "status",
			align: "center",
			ellipsis: true
		},
		{
			title: "操作",
			key: "action",
			align: "center",
			fixed: "right",
			render: (_, record) => (
				<Space>
					<a onClick={() => handleChangeStatus(record.userId, record.status, 0)}>禁用</a>
					<a onClick={() => handleChangeStatus(record.userId, record.status, 1)}>恢复</a>
				</Space>
			)
		}
	];

	const pagination = {
		showQuickJumper: true,
		showSizeChanger: false,
		pageSize: 10
	};

	const [filterForm] = Form.useForm();
	const { data, isLoading } = useQuery({
		queryKey: ["usersData", userListQuery],
		queryFn: () => getUsersListApi(userListQuery),
		select: res => {
			return res.data;
		},
		retry: 1
	});
	// let usersData: UserList.UsersDataType[] | undefined = data?.records;

	useEffect(() => {
		// usersData = data?.records;
		// fetchUserList();
		// console.log(BUTTONS);
	}, []);

	const fetchUserList = async () => {
		console.log("userListQuery of fetchUserList: ", userListQuery);
		await queryClient.refetchQueries({ queryKey: ["usersData", userListQuery] });
		// setLoading(true);
		// // await getUsersListApi(userListQuery).then(res => {
		// // 	setDataSource(handleData(res.data));
		// // });
		// usersData && setLoading(false);
		// setLoading(false);
	};

	// 重置
	const handleResetForm = () => {
		const userListQueryTemp: UserList.ReqUserListQuery = userListQuery;
		Object.keys(defaultUserListQuery).forEach(key => {
			// TODO 寻求更好解决方案
			// @ts-ignore
			if (defaultUserListQuery[key] !== undefined) {
				// TODO 寻求更好解决方案
				// @ts-ignore
				userListQueryTemp[key] = defaultUserListQuery[key];
			}
		});
		setUserListQuery(defaultUserListQuery);
		filterForm.resetFields();
		fetchUserList();
	};

	// 提交
	const handleSubmit = () => {
		// setLoading(true);
		filterForm.validateFields();
		// const userListQueryTemp: UserList.ReqUserListQuery = userListQuery;
		const fieldsValue = filterForm.getFieldsValue();
		console.log(fieldsValue, "fieldsValue");
		Object.keys(fieldsValue).forEach(key => {
			if (fieldsValue[key] !== undefined) {
				// TODO 寻求更好解决方案
				// @ts-ignore
				userListQuery[key] = fieldsValue[key];
			}
		});
		// console.log(userListQueryTemp, "userListQueryTemp");
		// for (let key in filterForm.getFieldsValue()) {
		// 	if (filterForm.getFieldValue(key) !== undefined) {
		// 		userListQueryTemp[key] = filterForm.getFieldValue(key);
		// 	}
		// }
		setUserListQuery(userListQuery);
		fetchUserList();
		// setLoading(false);
	};

	// 修改状态
	const handleChangeStatus = (id: number, curStatus: number, status: number) => {
		if (curStatus === status) return message.error("当前状态与操作一致，无需操作");
		const changedStatus = status === 1 ? 1 : 0;
		changeUserStatusApi({ userId: id, status: changedStatus }).then(() => {
			message.success("操作成功");
			fetchUserList();
		});
	};

	return (
		<div className="card content-box">
			<div className="top-title">用户管理</div>
			<Divider style={{ marginBottom: 10, marginTop: 5, marginRight: 0, marginLeft: 0 }}></Divider>
			<AdvancedSearchForm form={filterForm} handleReset={handleResetForm} handleSubmit={handleSubmit} />
			<Table<UserList.UsersDataType>
				id="usersTable"
				rowKey="userId"
				columns={columns}
				loading={isLoading}
				dataSource={data?.records}
				pagination={pagination}
				scroll={{ x: 1300 }}
				size="small"
				tableLayout="fixed"
			/>
		</div>
	);
};

export default UsersTable;
