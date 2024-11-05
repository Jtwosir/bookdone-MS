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
			],
			render: () => (
				<Select placeholder="bookStatus" allowClear>
					<Option value="-1">解析失败</Option>
					<Option value="0">未解析</Option>
					<Option value="1">解析中</Option>
					<Option value="2">解析完成</Option>
				</Select>
			)
		},
		{
			title: "章节树解析状态",
			key: "chapterStatus",
			render: () => (
				<Select placeholder="bookStatus" allowClear>
					<Option value="-1">解析失败</Option>
					<Option value="0">未解析</Option>
					<Option value="1">解析中</Option>
					<Option value="2">解析完成</Option>
				</Select>
			)
		},
		{
			title: "文件哈希值",
			key: "fileHash"
		}
	];

	return <FilterForm form={form} handleReset={handleReset} handleSubmit={handleSubmit} fields={fields} />;
};
