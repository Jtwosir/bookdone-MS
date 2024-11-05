import React from "react";

import { FilterForm } from "@/components/filterForm/filterForm";
import { Select } from "antd";

const { Option } = Select;

interface FilterFormProps {
	form: any;
	handleReset: () => void;
	handleSubmit: (values: any) => void;
}

export const AdvancedSearchForm: React.FC<FilterFormProps> = ({ form, handleReset, handleSubmit }) => {
	const fields = [
		{
			title: "用户名",
			key: "username"
		},
		{
			title: "userId",
			key: "userId",
			rules: [
				{
					pattern: /^[0-9]*$/,
					message: "需为整数"
				}
			]
		},
		{
			title: "内测 key",
			key: "keyVal"
		},
		{
			title: "手机号",
			key: "phoneNumber",
			rules: [
				{
					pattern: /^[0-9]*$/,
					message: "需为整数"
				}
			]
		},
		{
			title: "用户类型",
			key: "vip",
			render: () => (
				<Select placeholder="vip" allowClear>
					<Option value="0">普通用户</Option>
					<Option value="1">vip</Option>
				</Select>
			)
		},
		{
			title: "用户状态",
			key: "status",
			render: () => (
				<Select placeholder="status" allowClear>
					<Option value="0">正常</Option>
					<Option value="1">禁用</Option>
					<Option value="2">锁定</Option>
					<Option value="3">删除</Option>
				</Select>
			)
		}
	];

	return <FilterForm form={form} handleReset={handleReset} handleSubmit={handleSubmit} fields={fields} />;
};
