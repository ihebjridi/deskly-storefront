import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-3 flex-col">
      <Text className="text-body font-medium text-primary-900">{title}</Text>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx("flex gap-2 items-center", {
              "ml-[-23px]": i.value === value,
            })}
          >
            {i.value === value && <EllipseMiniSolid className="text-accent-400" />}
            <RadioGroup.Item
              checked={i.value === value}
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "!text-body !transform-none text-gray-600 hover:cursor-pointer transition-colors duration-200",
                {
                  "text-primary-900": i.value === value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
