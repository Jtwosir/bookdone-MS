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
			title: "书名",
			key: "bookName"
		},
		{
			title: "书本Id",
			key: "bookId",
			rules: [
				{
					pattern: /^[0-9]*$/,
					message: "需为整数"
				}
			]
		},
		{
			title: "所属用户 id",
			key: "userId",
			rules: [
				{
					pattern: /^[0-9]*$/,
					message: "需为整数"
				}
			]
		},
		{
			title: "作者",
			key: "author"
		},
		{
			title: "书本解析状态",
			key: "bookStatus",
			rules: [
				{
					pattern: /^-1|0|1|2$/,
					message: "必须是-1、0、1、2"
				}
			]
		},
		{
			title: "章节树解析状态",
			key: "chapterStatus",
			rules: [
				{
					pattern: /^-1|0|1|2$/,
					message: "必须是-1、0、1、2"
				}
			]
		},
		{
			title: "文件哈希值",
			key: "fileHash"
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
						<Form.Item name={column.key} label={column.title as string} rules={column?.rules}>
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
					<Button type="primary" htmlType="submit">
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
