import React, { useState } from "react";
import { Table, TableColumnsType, Form, Divider, Space, message } from "antd";
import "./index.less";
import { changeUserStatusApi, getUsersListApi } from "@/api/modules/user-admin-controller";
import { UserList } from "@/api/interface";
import { AdvancedSearchForm } from "@/views/customTable/usersTable/component/filterForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const defaultUserListQuery: UserList.ReqUserListQuery = {
// 	keyVal: "",
// 	pageNum: 0,
// 	pageSize: 0,
// 	phoneNumber: "",
// 	sortField: "",
// 	sortOrder: "",
// 	status: null,
// 	userId: null,
// 	username: "",
// 	vip: null
// };

const UsersTable = () => {
	const queryClient = useQueryClient();
	const [userListQuery, setUserListQuery] = useState({});
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
	const { data, isFetching } = useQuery({
		queryKey: ["usersData", userListQuery],
		queryFn: () => getUsersListApi(userListQuery as UserList.ReqUserListQuery),
		select: res => {
			return res.data;
		},
		retry: 1
	});
	let usersData: UserList.UsersDataType[] | undefined = data?.records;

	const { mutate, isPending } = useMutation({
		mutationFn: async (info: { status: number; userId: number }) => {
			await changeUserStatusApi(info);
		},
		onSuccess: () => {
			message.success("操作成功");
			queryClient.invalidateQueries({ queryKey: ["usersData"] }); // 刷新用户列表
		},
		onError: error => {
			message.error("操作失败: " + error.message);
		}
	});

	// 重置
	const handleResetForm = () => {
		filterForm.resetFields();
		const fieldsValue = filterForm.getFieldsValue();
		setUserListQuery({
			...fieldsValue
		});
	};

	// 提交
	const handleSubmit = () => {
		filterForm.validateFields();
		const fieldsValue = filterForm.getFieldsValue();
		setUserListQuery({
			...fieldsValue
		});
	};

	// 修改状态
	const handleChangeStatus = (id: number, curStatus: number, status: number) => {
		if (curStatus === status) return message.error("当前状态与操作一致，无需操作");
		const changedStatus = status === 1 ? 1 : 0;
		mutate({ userId: id, status: changedStatus });
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
				loading={isFetching || isPending}
				dataSource={usersData}
				pagination={pagination}
				scroll={{ x: 1300 }}
				size="small"
				tableLayout="fixed"
			/>
		</div>
	);
};

export default UsersTable;
