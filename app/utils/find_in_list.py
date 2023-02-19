def list_to_set(users):
  list = []
  for user in users:
    list.append(user.id)

  return set(list)


def find_in_list(user_set, list):
  for inbox in list:
    members_set = list_to_set(inbox.inbox_members)
    if user_set.intersection(members_set) == user_set:
      return inbox
  return False
