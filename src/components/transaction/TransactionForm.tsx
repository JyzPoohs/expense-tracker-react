import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePickerInput } from "@/components/common/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { SelectComponent } from "@/components/common/SelectComponent";
import type { TransactionFormData } from "@/types/transaction";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";

interface TransactionFormProps {
  initialData?: TransactionFormData;
  onSubmit: (data: TransactionFormData) => Promise<void>;
}

export const TransactionForm = ({
  initialData,
  onSubmit,
}: TransactionFormProps) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState<TransactionFormData>(
    initialData ?? {
      note: "",
      amount: 0,
      type: "EXPENSE",
      category: "",
      remarks: "",
      date: new Date(),
    },
  );

  const handleCategory = () => {
    return categories
      .filter((category) => category.type === formData.type)
      .map((cat) => ({
        label: cat.name,
        value: cat.name,
      }));
  };

  const handleChange = (field: keyof TransactionFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <Label htmlFor="type">Type</Label>
          <RadioGroup
            value={formData.type}
            onValueChange={(value) => handleChange("type", value)}
            className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="EXPENSE" id="r1" />
              <Label htmlFor="Expense">Expense</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="INCOME" id="r2" />
              <Label htmlFor="Income">Income</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="TRANSFER" id="r3" />
              <Label htmlFor="Transfer">Transfer</Label>
            </div>
          </RadioGroup>
        </Field>
        <Field>
          <Label htmlFor="note">Note</Label>
          <Input
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            placeholder="e.g., Groceries"
          />
        </Field>
        <Field>
          <Label htmlFor="amount">Amount (RM)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={(e) =>
              handleChange("amount", parseFloat(e.target.value) || 0)
            }
            placeholder="e.g., 9.00"
          />
        </Field>
        <Field>
          <Label htmlFor="date">Date</Label>
          <DatePickerInput
            value={formData.date}
            onChange={(date) => {
              if (date) {
                handleChange("date", date);
              }
            }}
          />
        </Field>
        {formData.type === "TRANSFER" ? (
          <>
            <Label>Account</Label>
            <div className="flex gap-2">
              <Field>
                <SelectComponent
                  label="From Account"
                  items={categories.map((cat) => ({
                    label: cat.name,
                    value: cat.name,
                  }))}
                  value={formData.category}
                  onChange={(value) => handleChange("category", value)}
                />
              </Field>
              <Field>
                <SelectComponent
                  label="To Account"
                  items={categories.map((cat) => ({
                    label: cat.name,
                    value: cat.name,
                  }))}
                  value={formData.category}
                  onChange={(value) => handleChange("category", value)}
                />
              </Field>
            </div>
          </>
        ) : (
          <>
            <Field>
              <Label htmlFor="category">Category</Label>
              <SelectComponent
                label="Category"
                items={handleCategory()}
                value={formData.category}
                onChange={(value) => handleChange("category", value)}
              />
            </Field>
            <Label>Account</Label>
            <Field>
              <SelectComponent
                label="To Account"
                items={categories.map((cat) => ({
                  label: cat.name,
                  value: cat.name,
                }))}
                value={formData.category}
                onChange={(value) => handleChange("category", value)}
              />
            </Field>
          </>
        )}
        <Field>
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={(e) => handleChange("remarks", e.target.value)}
            placeholder="e.g., Purchased groceries"
          />
        </Field>
      </FieldGroup>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" className="bg-amber-500">
          Submit
        </Button>
      </DialogFooter>
    </form>
  );
};
