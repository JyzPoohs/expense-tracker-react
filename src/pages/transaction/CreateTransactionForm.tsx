import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePickerInput } from "@/components/component/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import type { Category } from "@/types/category";
import { getAllCategorires } from "@/services/categoryService";
import { SelectComponent } from "@/components/component/SelectComponent";
import { createTransaction } from "@/services/transactionService";

export const CreateTransactionForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("Expense");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [remarks, setRemarks] = useState("");

  const [formData, setFormData] = useState({
    note: "",
    amount: 0,
    type: "",
    category: "",
    remarks: "",
    date: new Date(),
  });

  const handleChange = (field: string, value: string | number | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    await createTransaction(formData);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategorires();
      setCategories(data);
    };

    fetchCategories();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Transactions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-amber-1000">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center">Add Transaction</DialogTitle>
          </DialogHeader>
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
            <Field>
              <Label htmlFor="category">Category</Label>
              <SelectComponent
                label="Category"
                items={categories.map((cat) => cat.name)}
                value={formData.category}
                onChange={(value) => handleChange("category", value)}
              />
            </Field>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-amber-500">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
