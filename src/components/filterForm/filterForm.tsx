import { Button, Col, Form, Input, Row, Space } from "antd";
import React, { useState } from "react";

import { DownOutlined } from "@ant-design/icons";

interface FilterFormProps {
	fields: any[];
	form: any;
	handleReset: () => void;
	handleSubmit: (values: any) => void;
}

export const FilterForm: React.FC<FilterFormProps> = ({ form, handleReset, handleSubmit, fields }) => {
	const [expand, setExpand] = useState(false);
	const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
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
							{column?.render ? (
								column?.render()
							) : (
								<Input placeholder={column.key as string} onPressEnter={e => preventBubble(e)} />
							)}
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
