import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface Props {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
  searchPlaceholder: string;
  emptyPlaceholder: string;
  onChange?: (value: string) => void;
}

const ComboboxInput = ({
  form,
  name,
  label,
  placeholder,
  options,
  searchPlaceholder,
  disabled,
  emptyPlaceholder,
  required = true,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="mb-1 mt-2">
            {label}{" "}
            {!required && (
              <span className="ml-1 font-normal text-gray-2">(Opsional)</span>
            )}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={disabled}
                >
                  {field.value
                    ? options?.find(
                        (language) => language.value === field.value
                      )?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className=" popover-content-width-full p-0">
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {options.map((language) => (
                      <CommandItem
                        value={language.label}
                        key={language.value}
                        onSelect={() => {
                          if (onChange) {
                            onChange(language.value);
                          } else {
                            form.setValue(name, language.value);
                          }
                          form.trigger(name);
                          setOpen(false);
                        }}
                        disabled={language.disabled}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 ",
                            language.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {language.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxInput;
