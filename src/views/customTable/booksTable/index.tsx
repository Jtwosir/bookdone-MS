import React, { useEffect, useState } from "react";
import { Divider, Form, Table, TableColumnsType } from "antd";

import "./index.less";
import { AdvancedSearchForm } from "@/views/customTable/booksTable/component/filterForm";
import { getBooksListApi } from "@/api/modules/book-admin-controller";
import { BookList } from "@/api/interface";

export interface BooksDataType {
	author: string;
	bookId: number;
	bookName: string;
	bookStatus: number;
	chapterStatus: number;
	fileHash: string;
	userId: number;
}

const defaultBooksListQuery: BookList.ReqBookListQuery = {
	author: "",
	bookId: null,
	bookName: "",
	bookStatus: null,
	chapterStatus: null,
	coverUrl: "",
	fileHash: "",
	fileUrl: "",
	pageNum: 0,
	pageSize: 0,
	sortField: "",
	sortOrder: "",
	userId: null,
	userStatus: null
};

const UsersTable = () => {
	const [booksListQuery, setBooksListQuery] = useState<BookList.ReqBookListQuery>(defaultBooksListQuery);
	const [booksData, setBooksData] = useState();
	const [loading, setLoading] = useState(false);
	const [filterForm] = Form.useForm();

	const columns: TableColumnsType<BooksDataType> = [
		{
			title: "bookId",
			dataIndex: "bookId",
			align: "center",
			ellipsis: true
		},
		{
			title: "书本名",
			dataIndex: "bookName",
			align: "center",
			ellipsis: true
		},
		{
			title: "所属用户 id",
			dataIndex: "userId",
			align: "center",
			ellipsis: true
		},
		{
			title: "作者",
			dataIndex: "author",
			align: "center",
			ellipsis: true
		},
		// {
		// 	title: "封面 url",
		// 	dataIndex: "coverUrl",
		// 	align: "center",
		// 	ellipsis: true
		// },
		// {
		// 	title: "文件 url",
		// 	dataIndex: "fileUrl",
		// 	align: "center",
		// 	ellipsis: true
		// },
		{
			title: "文件哈希值",
			dataIndex: "fileHash",
			align: "center",
			ellipsis: true
		},
		{
			title: "书本解析状态",
			dataIndex: "bookStatus",
			align: "center",
			ellipsis: true
		},
		{
			title: "章节树解析状态",
			dataIndex: "chapterStatus",
			align: "center",
			ellipsis: true
		}
		// {
		// 	title: "用户状态",
		// 	dataIndex: "userStatus",
		// 	align: "center",
		// 	ellipsis: true
		// 	下拉框：正常 / 禁用 / 锁定 / 删除
		// render: (_, record) => (
		// 	<Select value={record.statue} options={[{ value: "normal", label: <span>sample</span> }]} onChange={handleStatusChange}>
		// 		{/*<Option value="normal">正常</Option>*/}
		// 		{/*<Option value="disabled">禁用</Option>*/}
		// 		{/*<Option value="locked">锁定</Option>*/}
		// 		{/*<Option value="deleted">删除</Option>*/}
		// 	</Select>
		// )
		// }
	];

	const pagination = {
		showQuickJumper: true,
		showSizeChanger: false,
		pageSize: 10
	};

	const fetchBookList = async () => {
		setLoading(true);
		await getBooksListApi(booksListQuery).then(res => {
			setBooksData(handleData(res.data));
		});
		setLoading(false);
	};

	const handleData = (data: any) => {
		const { records } = data;
		// return records.map((user: BooksDataType) => ({
		// 	...user,
		// 	key: user.bookId
		// }));
		return records;
	};
	useEffect(() => {
		fetchBookList();
	}, []);

	// 提交
	const handleSubmit = () => {
		setLoading(true);
		filterForm.validateFields();
		const userListQueryTemp: BookList.ReqBookListQuery = booksListQuery;
		const fieldsValue = filterForm.getFieldsValue();
		console.log(fieldsValue, "fieldsValue");
		Object.keys(fieldsValue).forEach(key => {
			if (fieldsValue[key] !== undefined) {
				// TODO 寻求更好解决方案
				// @ts-ignore
				userListQueryTemp[key] = fieldsValue[key];
			}
		});
		console.log(userListQueryTemp, "userListQueryTemp");
		setBooksListQuery(userListQueryTemp);
		fetchBookList();
		setLoading(false);
	};

	// 重置
	const handleResetForm = () => {
		console.log("handleResetForm");
		setBooksListQuery(defaultBooksListQuery);
		filterForm.resetFields();
		fetchBookList();
	};

	// 处理下拉框选择事件的函数
	// const handleStatusChange = (value: string) => {
	// 	console.log("处理下拉框选择事件", value);
	// };
	return (
		<div className="card content-box">
			<div className="top-title">图书管理</div>
			<Divider style={{ marginBottom: 10, marginTop: 5, marginRight: 0, marginLeft: 0 }}></Divider>
			<AdvancedSearchForm form={filterForm} handleReset={handleResetForm} handleSubmit={handleSubmit} />
			<Table<BooksDataType>
				id="usersTable"
				rowKey="bookId"
				columns={columns}
				loading={loading}
				dataSource={booksData}
				pagination={pagination}
				scroll={{ x: 1300 }}
				size="small"
				tableLayout="fixed"
			/>
		</div>
	);
};

export default UsersTable;
