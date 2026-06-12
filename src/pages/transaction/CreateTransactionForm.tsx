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

export const CreateTransactionForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategorires();
      setCategories(data);
    };

    fetchCategories();
  }, []);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Add Transactions
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm bg-amber-1000">
          <DialogHeader>
            <DialogTitle className="text-center">Add Transaction</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="type">Type</Label>
              <RadioGroup
                defaultValue="comfortable"
                className="flex justify-around w-max"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Expense</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Income</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Transfer</Label>
                </div>
              </RadioGroup>
            </Field>
            <Field>
              <Label htmlFor="note">Note</Label>
              <Input
                id="note"
                name="note"
                defaultValue=""
                placeholder="e.g., Groceries"
              />
            </Field>
            <Field>
              <Label htmlFor="amount">Amount (RM)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                defaultValue=""
                placeholder="e.g., 9.00"
              />
            </Field>
            <Field>
              <Label htmlFor="date">Date</Label>
              <DatePickerInput />
            </Field>
            <Field>
              <Label htmlFor="category">Category</Label>
              <SelectComponent
                label="Category"
                items={categories.map((cat) => cat.name)}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </Field>
            <Field>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                name="remarks"
                defaultValue=""
                placeholder="e.g., Purchased groceries"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-amber-500">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
