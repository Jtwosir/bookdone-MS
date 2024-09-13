import { Button, Col, Form, Input, Row, Space } from "antd";
import React, { useState } from "react";

import { DownOutlined } from "@ant-design/icons";

interface FilterFormProps {
	form: any;
	handleReset: () => void;
	handleSubmit: (values: any) => void;
}

export const AdvancedSearchForm: React.FC<FilterFormProps> = ({ form, handleReset, handleSubmit }) => {
	const [expand, setExpand] = useState(false);
	const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
	const fields = [
		{
			title: "作者",
			key: "author",
			rules: [
				{
					type: "string",
					message: "请输入用户名"
				}
			]
		},
		{
			title: "书本Id",
			key: "bookId",
			rules: [
				{
					type: "number",
					message: "请输入用户ID"
				}
			]
		},
		{
			title: "书名",
			key: "bookName",
			rules: [
				{
					type: "string",
					message: "请输入内测 key"
				}
			]
		},
		{
			title: "书本解析状态",
			key: "bookStatus",
			rules: [
				{
					type: "string",
					message: "请输入手机号"
				}
			]
		},
		{
			title: "章节树解析状态",
			key: "chapterStatus",
			rules: [
				{
					type: "number",
					message: "请输入用户类型"
				}
			]
		},
		// {
		// 	title: "原始额度",
		// 	key: "originalQuota",
		// 	rules: [
		// 		{
		// 			type: "string",
		// 			message: "请输入原始额度"
		// 		}
		// 	]
		// },
		// {
		// 	title: "当前额度",
		// 	key: "currentQuota",
		// 	rules: [
		// 		{
		// 			type: "string",
		// 			message: "请输入当前额度"
		// 		}
		// 	]
		// },
		// {
		// 	title: "书本数量",
		// 	key: "bookNum",
		// 	rules: [
		// 		{
		// 			type: "string",
		// 			message: "请输入书本数量"
		// 		}
		// 	]
		// },
		{
			title: "文件哈希值",
			key: "fileHash",
			rules: [
				{
					type: "string",
					message: "请输入用户状态"
				}
			]
		},
		{
			title: "所属用户 id",
			key: "userId",
			rules: [
				{
					type: "string",
					message: "请输入用户状态"
				}
			]
		}
	];

	const getFields = () => {
		const count = expand ? fields?.length ?? 0 : 6;
		const children = [];
		for (let i = 0; i < count; i++) {
			if (fields?.[i]) {
				const column = fields[i];
				children.push(
					<Col span={8} key={column.key}>
						<Form.Item name={column.key} label={column.title as string}>
							<Input placeholder={column.key as string} />
						</Form.Item>
					</Col>
				);
			}
		}
		return children;
	};

	return (
		<Form {...formItemLayout} form={form} name="advanced_search" onFinish={handleSubmit} style={{ marginBottom: 10 }}>
			<Row gutter={24}>{getFields()}</Row>
			<div style={{ textAlign: "right" }}>
				<Space size="small">
					<Button type="primary" onClick={handleSubmit}>
						Search
					</Button>
					<Button onClick={handleReset}>Clear</Button>
					{fields?.length > 6 && (
						<a
							style={{ fontSize: 12 }}
							onClick={() => {
								setExpand(!expand);
							}}
						>
							<DownOutlined rotate={expand ? 180 : 0} /> {expand ? "收起" : "展开"}
						</a>
					)}
				</Space>
			</div>
		</Form>
	);
};
