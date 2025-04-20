import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Autocomplete } from "./Autocomplete";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Autocomplete",
  component: Autocomplete,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;




// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => <DefaultAutocomplete />
};

const defaultOptions = [
  'Javascript',
  'Java',
  'Swift',
  'Python',
  'Golang'
]
const DefaultAutocomplete = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<string[]>(defaultOptions)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const onSearch = async (searchValue: string) => {
    if (!searchValue) setOptions([])
    setIsSearching(true)
    await new Promise(resolve => setTimeout(() => resolve("some value"), 1000));
    setOptions(defaultOptions.filter(a => a.includes(searchValue)))
    setIsSearching(false)
  }
  return (
    <Autocomplete
      value={value}
      onChange={(value: string) => setValue(value)}
      options={options}
      onSearch={onSearch}
      label="Autocomplete"
      isSearching={isSearching}
    />
  );
};
