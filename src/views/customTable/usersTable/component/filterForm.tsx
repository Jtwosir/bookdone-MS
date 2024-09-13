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
			title: "用户名",
			key: "username",
			rules: [
				{
					type: "string",
					message: "请输入用户名"
				}
			]
		},
		{
			title: "userId",
			key: "userId",
			rules: [
				{
					type: "number",
					message: "请输入用户ID"
				}
			]
		},
		{
			title: "内测 key",
			key: "keyVal",
			rules: [
				{
					type: "string",
					message: "请输入内测 key"
				}
			]
		},
		{
			title: "手机号",
			key: "phoneNumber",
			rules: [
				{
					type: "string",
					message: "请输入手机号"
				}
			]
		},
		{
			title: "用户类型",
			key: "vip",
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
			title: "用户状态",
			key: "status",
			rules: [
				{
					type: "string",
					message: "请输入用户状态"
				}
			]
		}
	];
	const preventBubble = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
	};
	const getFields = () => {
		const count = expand ? fields?.length ?? 0 : 6;
		const children = [];
		for (let i = 0; i < count; i++) {
			if (fields?.[i]) {
				const column = fields[i];
				children.push(
					<Col span={8} key={column.key}>
						<Form.Item name={column.key} label={column.title as string}>
							<Input placeholder={column.key as string} onPressEnter={e => preventBubble(e)} />
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
